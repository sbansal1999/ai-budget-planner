"use client";

import { API_URLS, getIndianCurrencyFormat } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const budgetAnalysisDataSchema = z.object({
  analysis: z.object({
    category_budgets: z.record(
      z.object({
        estimated_budget: z.number(),
      })
    ),
    suggestions_for_spending_habits: z.array(z.string()),
    total_estimated_monthly_expenses: z.number(),
  }),
});

export default function BudgetAnalysis() {
  const budgetAnalysisQuery = useQuery<
    z.infer<typeof budgetAnalysisDataSchema>
  >({
    queryKey: ["budget-analysis"],
    queryFn: async () => {
      const response = await axios.get(API_URLS.GET_ANALYSIS_URL);
      return budgetAnalysisDataSchema.parse(response.data);
    },
    staleTime: 1000 * 60 * 5,
  });

  if (budgetAnalysisQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (budgetAnalysisQuery.isError) {
    return <div>Error: {budgetAnalysisQuery.error.message}</div>;
  }

  if (!budgetAnalysisQuery.data) {
    return <div>No data</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row lg:justify-center gap-4 p-4">
      <div>
        <CategoryBudgets
          categoryBudgets={budgetAnalysisQuery.data.analysis.category_budgets}
        />
      </div>
      <div className="flex flex-col gap-4">
        <SuggestionsForSpendingHabits
          suggestions={
            budgetAnalysisQuery.data.analysis.suggestions_for_spending_habits
          }
        />
        <TotalEstimatedMonthlyExpenses
          totalEstimatedMonthlyExpenses={
            budgetAnalysisQuery.data.analysis.total_estimated_monthly_expenses
          }
        />
      </div>
    </div>
  );
}

function CategoryBudgets({
  categoryBudgets,
}: {
  categoryBudgets: z.infer<
    typeof budgetAnalysisDataSchema
  >["analysis"]["category_budgets"];
}) {
  return (
    <Table>
      <TableCaption>Category Budgets</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Category</TableHead>
          <TableHead>Estimated Budget</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.entries(categoryBudgets).map(
          ([category, { estimated_budget }]) => (
            <TableRow key={category}>
              <TableCell>{category}</TableCell>
              <TableCell>{getIndianCurrencyFormat(estimated_budget)}</TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
}

function SuggestionsForSpendingHabits({
  suggestions,
}: {
  suggestions: z.infer<
    typeof budgetAnalysisDataSchema
  >["analysis"]["suggestions_for_spending_habits"];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Suggestions for Spending Habits</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5">
          {suggestions.map((suggestion) => (
            <li key={suggestion}>{suggestion}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function TotalEstimatedMonthlyExpenses({
  totalEstimatedMonthlyExpenses,
}: {
  totalEstimatedMonthlyExpenses: z.infer<
    typeof budgetAnalysisDataSchema
  >["analysis"]["total_estimated_monthly_expenses"];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Estimated Monthly Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          Total estimated monthly expenses:{" "}
          {getIndianCurrencyFormat(totalEstimatedMonthlyExpenses)}
        </div>
      </CardContent>
    </Card>
  );
}
