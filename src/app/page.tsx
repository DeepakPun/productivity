import Notes from "./components/Notes";
import ShoppingList from "./components/ShoppingList";

interface PageProps {
  searchParams: Promise<{ view?: string }>;
}

export default async function DefaultPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const activeView = params.view || "shopping";

  // Evaluates query matrices to change underlying panels safely on the server side
  if (activeView === "notes") {
    return <Notes />;
  }

  return <ShoppingList />;
}
