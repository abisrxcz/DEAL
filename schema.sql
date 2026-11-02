-- Run once in Supabase > SQL Editor
create table profiles(id uuid primary key references auth.users on delete cascade, role text not null check(role in('vendor','checker','broker')), ident text unique not null, station text, approved boolean not null default false, created_at timestamptz default now());
create table catches(id text primary key, name text not null, sci text, cat text, grade text, price numeric not null, start numeric not null, bid numeric not null, kg numeric not null, tubs int not null, claimed numeric not null default 0, verified boolean not null default false, src text, fresh numeric default 0, created_by uuid default auth.uid(), created_at timestamptz default now());
create table passes(id text primary key, cid text references catches, name text, kg numeric, total numeric, status text default 'escrow', vendor_id uuid default auth.uid(), created_at timestamptz default now());
create table checks(id bigserial primary key, cid text, name text, res text, by_name text, by_id uuid default auth.uid(), created_at timestamptz default now());
alter table profiles enable row level security; alter table catches enable row level security; alter table passes enable row level security; alter table checks enable row level security;
create function my_role() returns text language sql security definer stable set search_path=public as $$ select role from profiles where id=auth.uid() and approved $$;
create policy p_sel on profiles for select using(id=auth.uid());
create policy p_ins on profiles for insert with check(id=auth.uid() and approved=(role='vendor'));
create policy c_sel on catches for select using(my_role() is not null);
create policy c_ins on catches for insert with check(my_role()='checker' and verified=false and claimed=0);
create policy c_upd on catches for update using(my_role() in('checker','broker'));
create policy pa_sel on passes for select using(my_role()='broker' or vendor_id=auth.uid());
create policy k_sel on checks for select using(my_role() in('checker','broker'));
create policy k_ins on checks for insert with check(my_role()='checker');
create function claim_portion(p_cid text,p_kg numeric) returns void language plpgsql security definer set search_path=public as $$
declare c catches;
begin
 if my_role() is distinct from 'vendor' then raise exception 'Vendors only'; end if;
 select * into c from catches where id=p_cid for update;
 if not found or not c.verified then raise exception 'Lot not available'; end if;
 if p_kg<=0 or p_kg>c.kg-c.claimed then raise exception 'Only % kg open',c.kg-c.claimed; end if;
 update catches set claimed=case when claimed+p_kg>=kg and tubs>1 then 0 else claimed+p_kg end, tubs=case when claimed+p_kg>=kg and tubs>1 then tubs-1 else tubs end where id=p_cid;
 insert into passes(id,cid,name,kg,total) values('QR-DEAL-'||lpad((floor(random()*90000)+10000)::int::text,5,'0'),p_cid,c.name,p_kg,c.price*p_kg*1.05+4*p_kg);
end $$;
create function release_escrow(p_id text) returns void language plpgsql security definer set search_path=public as $$
begin
 if my_role() is distinct from 'broker' then raise exception 'Brokers only'; end if;
 if not exists(select 1 from passes p join catches c on c.id=p.cid where p.id=p_id and c.verified) then raise exception 'Suri-Isda inspection still pending'; end if;
 update passes set status='released' where id=p_id;
end $$;
revoke execute on function claim_portion(text,numeric), release_escrow(text) from public, anon;
grant execute on function claim_portion(text,numeric), release_escrow(text) to authenticated;
alter publication supabase_realtime add table catches, passes, checks;
