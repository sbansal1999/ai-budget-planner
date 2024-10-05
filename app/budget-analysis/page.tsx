import { Metadata } from "next";
import Header from "../header/layout";
import BudgetAnalysis from "./BudgetAnalysis";

export const metadata: Metadata = {
  title: "AI Budget Planner - Analysis",
};

export default function AddExpense() {
  return (
    <Header>
      <div className="my-8">
        <BudgetAnalysis />
      </div>
    </Header>
  );
}
