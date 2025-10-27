#!/bin/bash

# Script to initialize the Supabase database with bench_list table
# This script should be run after starting the Supabase local development stack

echo "Initializing Supabase database with bench_list table..."

# Apply migrations
npx supabase migration up

# Restart Supabase to ensure all changes are applied
npx supabase restart

echo "Database initialization complete!"
echo "The bench_list table has been created and populated with sample data."