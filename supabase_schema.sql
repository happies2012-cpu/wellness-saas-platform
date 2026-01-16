-- Create profiles table (extends auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  website text,

  constraint username_length check (char_length(username) >= 3)
);

-- Set up Row Level Security (RLS)
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone." on public.profiles
  for select using (true);

create policy "Users can insert their own profile." on public.profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on public.profiles
  for update using (auth.uid() = id);

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- Workflows Table
create table if not exists public.workflows (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  description text,
  status text check (status in ('active', 'paused', 'draft')) default 'draft',
  executions integer default 0,
  success_rate integer default 0,
  created_by uuid references auth.users not null
);

alter table public.workflows enable row level security;

create policy "Users can view their own workflows" on public.workflows
  for select using (auth.uid() = created_by);

create policy "Users can insert their own workflows" on public.workflows
  for insert with check (auth.uid() = created_by);

create policy "Users can update their own workflows" on public.workflows
  for update using (auth.uid() = created_by);

create policy "Users can delete their own workflows" on public.workflows
  for delete using (auth.uid() = created_by);


-- Products Table (E-commerce)
create table if not exists public.products (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  description text,
  price numeric not null,
  stock integer default 0,
  category text,
  status text check (status in ('active', 'draft', 'out_of_stock')) default 'draft',
  sales integer default 0,
  workspace_id uuid -- Placeholder for workspace logic
);

alter table public.products enable row level security;
-- Simplified RLS for demo (allow authenticated users to manage products)
create policy "Authenticated users can manage products" on public.products
  for all using (auth.role() = 'authenticated');


-- Contact Submissions Table
create table if not exists public.contact_submissions (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text not null,
  message text not null
);

alter table public.contact_submissions enable row level security;
-- Allow anonymous inserts (for public contact form)
create policy "Anyone can insert contact submissions" on public.contact_submissions
  for insert with check (true);
-- Only authenticated users (admins) can view
create policy "Only admins can view submissions" on public.contact_submissions
  for select using (auth.role() = 'authenticated');


-- Revenue Metrics Table
create table if not exists public.revenue_metrics (
  id uuid default gen_random_uuid() primary key,
  date date not null,
  amount numeric not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.revenue_metrics enable row level security;
create policy "Authenticated users can view revenue" on public.revenue_metrics
  for select using (auth.role() = 'authenticated');

-- Insert Dummy Data for Revenue
insert into public.revenue_metrics (date, amount) values
  (current_date - interval '6 days', 1500),
  (current_date - interval '5 days', 2300),
  (current_date - interval '4 days', 3200),
  (current_date - interval '3 days', 2800),
  (current_date - interval '2 days', 4100),
  (current_date - interval '1 day', 3500),
  (current_date, 4500);
