#!/bin/bash

# GUIDESOFT AI - Supabase Configuration Script
# This script will help you configure your database connection

echo "🔧 GUIDESOFT AI - Database Configuration"
echo "=========================================="
echo ""

# Get Supabase credentials
echo "📋 Please provide your Supabase credentials:"
echo ""

read -p "Supabase URL (default: https://supabase.guideitsol.com): " SUPABASE_URL
SUPABASE_URL=${SUPABASE_URL:-https://supabase.guideitsol.com}

read -p "Database Username (default: 8n16Nimhpi833EeG): " DB_USER
DB_USER=${DB_USER:-8n16Nimhpi833EeG}

read -sp "Database Password: " DB_PASSWORD
echo ""

read -p "Supabase Anon Key: " ANON_KEY
read -p "Supabase Service Role Key: " SERVICE_KEY

# Create .env.local file
echo ""
echo "✅ Creating .env.local file..."

cat > .env.local << EOF
# Application
NEXT_PUBLIC_APP_URL=https://workflow.gsapps.in

# Supabase
NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=$ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=$SERVICE_KEY

# Database
DATABASE_URL=postgresql://$DB_USER:$DB_PASSWORD@supabase.guideitsol.com:5432/postgres
EOF

echo "✅ .env.local file created!"
echo ""
echo "📊 Your configuration:"
echo "  Supabase URL: $SUPABASE_URL"
echo "  Database User: $DB_USER"
echo "  Database: postgres"
echo ""
echo "🚀 Next steps:"
echo "  1. Run database migrations: npm run migrate"
echo "  2. Test locally: npm run dev"
echo "  3. Deploy to Vercel with these credentials"
echo ""
