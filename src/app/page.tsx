import Button from "@/app/components/Button";
import { createClient } from '@/utils/supabase/server'

export const revalidate = 0;

export default async function Home() {
  const supabase = await createClient();

  const { data: questions, error } = await supabase
    .from('questionCollection')
    .select()

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <main>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        {/* <Button label="Click me" onClick={() => alert("Hello World")} /> */}
        <pre>{JSON.stringify(questions, null, 2)}</pre>
      </main>
    </>
  );
}
