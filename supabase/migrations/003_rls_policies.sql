-- Row Level Security Policies
-- Implements secure data access based on user roles and workspace membership

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspace_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_agents ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can view own profile"
    ON profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
    ON profiles FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid()
            AND role IN ('super_admin', 'admin')
        )
    );

CREATE POLICY "Admins can update all profiles"
    ON profiles FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid()
            AND role IN ('super_admin', 'admin')
        )
    );

-- Workspaces Policies
CREATE POLICY "Users can view their workspaces"
    ON workspaces FOR SELECT
    USING (
        owner_id = auth.uid()
        OR EXISTS (
            SELECT 1 FROM workspace_members
            WHERE workspace_id = workspaces.id
            AND user_id = auth.uid()
        )
    );

CREATE POLICY "Owners can update their workspaces"
    ON workspaces FOR UPDATE
    USING (owner_id = auth.uid());

CREATE POLICY "Users can create workspaces"
    ON workspaces FOR INSERT
    WITH CHECK (owner_id = auth.uid());

-- Workspace Members Policies
CREATE POLICY "Users can view workspace members"
    ON workspace_members FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM workspaces
            WHERE id = workspace_members.workspace_id
            AND (
                owner_id = auth.uid()
                OR EXISTS (
                    SELECT 1 FROM workspace_members wm
                    WHERE wm.workspace_id = workspaces.id
                    AND wm.user_id = auth.uid()
                )
            )
        )
    );

-- Workflows Policies
CREATE POLICY "Users can view workspace workflows"
    ON workflows FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM workspaces
            WHERE id = workflows.workspace_id
            AND (
                owner_id = auth.uid()
                OR EXISTS (
                    SELECT 1 FROM workspace_members
                    WHERE workspace_id = workspaces.id
                    AND user_id = auth.uid()
                )
            )
        )
    );

CREATE POLICY "Users can create workflows"
    ON workflows FOR INSERT
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own workflows"
    ON workflows FOR UPDATE
    USING (user_id = auth.uid());

CREATE POLICY "Users can delete own workflows"
    ON workflows FOR DELETE
    USING (user_id = auth.uid());

-- Leads Policies
CREATE POLICY "Users can view workspace leads"
    ON leads FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM workspaces
            WHERE id = leads.workspace_id
            AND (
                owner_id = auth.uid()
                OR EXISTS (
                    SELECT 1 FROM workspace_members
                    WHERE workspace_id = workspaces.id
                    AND user_id = auth.uid()
                )
            )
        )
    );

CREATE POLICY "Users can create leads"
    ON leads FOR INSERT
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update workspace leads"
    ON leads FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM workspaces
            WHERE id = leads.workspace_id
            AND (
                owner_id = auth.uid()
                OR EXISTS (
                    SELECT 1 FROM workspace_members
                    WHERE workspace_id = workspaces.id
                    AND user_id = auth.uid()
                )
            )
        )
    );

-- Products Policies
CREATE POLICY "Users can view workspace products"
    ON products FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM workspaces
            WHERE id = products.workspace_id
            AND (
                owner_id = auth.uid()
                OR EXISTS (
                    SELECT 1 FROM workspace_members
                    WHERE workspace_id = workspaces.id
                    AND user_id = auth.uid()
                )
            )
        )
    );

CREATE POLICY "Users can create products"
    ON products FOR INSERT
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own products"
    ON products FOR UPDATE
    USING (user_id = auth.uid());

-- AI Agents Policies
CREATE POLICY "Users can view workspace agents"
    ON ai_agents FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM workspaces
            WHERE id = ai_agents.workspace_id
            AND (
                owner_id = auth.uid()
                OR EXISTS (
                    SELECT 1 FROM workspace_members
                    WHERE workspace_id = workspaces.id
                    AND user_id = auth.uid()
                )
            )
        )
    );

CREATE POLICY "Users can create agents"
    ON ai_agents FOR INSERT
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own agents"
    ON ai_agents FOR UPDATE
    USING (user_id = auth.uid());
