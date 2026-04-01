"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

type RandomQuoteResponse = {
  id: number;
  quote: string;
  author: string;
};

async function fetchRandomQuote() {
  const response = await api.get<RandomQuoteResponse>(
    "https://dummyjson.com/quotes/random"
  );
  return response.data;
}

export function useRandomQuote() {
  return useQuery({
    queryKey: ["random-quote"],
    queryFn: fetchRandomQuote,
  });
}
