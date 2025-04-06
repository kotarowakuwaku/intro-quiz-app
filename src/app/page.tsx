'use client';

import Button from "@/app/components/Button";

export default function Home() {
  return (
    <>
      <main>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <Button label="Click me" onClick={() => alert("Hello World")} />
      </main>
    </>
  );
}
