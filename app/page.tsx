import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle, ArrowRight, BarChart } from "lucide-react";
import Header from "./header/layout";
import Head from "next/head";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Budget Planner",
};

export default function Home() {
  return (
    <>
      <Head>
        <title>My page title</title>
      </Head>
      <Header>
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-20 xl:py-20">
            <div className="px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    AI-Powered Budget Planning
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                    Take control of your finances with intelligent insights and
                    effortless expense tracking.
                  </p>
                </div>
                <div className="space-x-4">
                  <Link href="/add-expense">
                    <Button>
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-20 bg-gray-100 dark:bg-gray-800">
            <div className="px-4 md:px-6">
              <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                  <PlusCircle className="h-10 w-10 text-primary" />
                  <h2 className="text-xl font-bold">Easy Expense Tracking</h2>
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Quickly add and categorize your expenses with our intuitive
                    interface.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                  <BarChart className="h-10 w-10 text-primary" />
                  <h2 className="text-xl font-bold">AI-Powered Analysis</h2>
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Get intelligent insights and recommendations based on your
                    spending habits.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                  <ArrowRight className="h-10 w-10 text-primary" />
                  <h2 className="text-xl font-bold">Personalized Budgeting</h2>
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Create custom budgets tailored to your financial goals and
                    lifestyle.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </Header>
    </>
  );
}
