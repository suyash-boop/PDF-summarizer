CREATE TABLE IF NOT EXISTS pdf_summaries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  file_path TEXT NOT NULL,
  quick_summary JSONB,
  detailed_summary JSONB,
  custom_prompts JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

alter publication supabase_realtime add table pdf_summaries;

DROP POLICY IF EXISTS "Users can view their own summaries";
CREATE POLICY "Users can view their own summaries"
ON pdf_summaries FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own summaries";
CREATE POLICY "Users can insert their own summaries"
ON pdf_summaries FOR INSERT
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own summaries";
CREATE POLICY "Users can update their own summaries"
ON pdf_summaries FOR UPDATE
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own summaries";
CREATE POLICY "Users can delete their own summaries"
ON pdf_summaries FOR DELETE
USING (auth.uid() = user_id);
