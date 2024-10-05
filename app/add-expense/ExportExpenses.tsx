"use client";

import { Button } from "@/components/ui/button";
import { API_URLS } from "@/lib/utils";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { json2csv } from "json-2-csv";
import { z } from "zod";

const rowSchema = z.object({
  date: z.string(),
  title: z.string(),
  amount: z.number(),
  remarks: z.string().nullable(),
  category: z.string(),
});

const schema = z.object({
  rows: z.array(rowSchema),
});

export default function ExportExpenses() {
  const expensesQuery = useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const response = await axios.get(API_URLS.GET_EXPENSES_URL);
      if (!response.data) {
        throw new Error("No data found");
      }
      const parsedData = schema.parse(response.data);

      const csvData = json2csv(parsedData.rows);
      const csvBlob = new Blob([csvData], { type: "text/csv" });
      const csvUrl = URL.createObjectURL(csvBlob);
      const link = document.createElement("a");
      link.setAttribute("href", csvUrl);
      link.setAttribute("download", "expenses.csv");
      link.click();
      
      return response.data;
    },
    enabled: false,
  });

  function handleExportExpenses() {
    expensesQuery.refetch();
  }

  return (
    <div className="mx-auto">
      <Button
        variant="default"
        size="lg"
        className="px-10"
        onClick={handleExportExpenses}
        disabled={expensesQuery.isLoading}
      >
        {expensesQuery.isLoading ? (
          <>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Exporting...
          </>
        ) : (
          "Export Expenses"
        )}
      </Button>
    </div>
  );
}
