/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "API Calls Statistics"

interface PieChartMetricsProps {
  totalCalls: number
  successCalls: number
  failCalls: number
}

export function PieChartMetrics({ totalCalls, successCalls, failCalls }: PieChartMetricsProps) {
  // Data for the pie chart
  const chartData = [
    { name: "Successful API Calls", value: successCalls, fill: "hsl(143.8 61.2% 20.2%)"},
    { name: "Failed API Calls", value: failCalls, fill: "hsl(0 73.7% 41.8%)" },
  ]

  // Config for the chart
  const chartConfig = {
    successCalls: {
      label: "Successful API Calls",
      color: "hsl(210 40% 98%)",
    },
    failCalls: {
      label: "Failed API Calls",
      color: "hsl(210 40% 98%)",
    },
  } satisfies ChartConfig

  // Calculate the total calls
  const totalCallsFormatted = React.useMemo(() => {
    return totalCalls.toLocaleString()
  }, [totalCalls])

  return (
    <div>
      <Card className="flex flex-col text-white bg-neutral-800 border-none max-w-[400px] w-full">
        <CardHeader className="items-center pb-0">
          <CardTitle>API Calls Statistics</CardTitle>
          {/* <CardDescription>January - June 2024</CardDescription> */}
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-white text-3xl font-bold"
                          >
                            {totalCallsFormatted}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-slate-200"
                          >
                            Total Calls
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
        {/* <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing data for the last 6 months
          </div>
        </CardFooter> */}
      </Card>
    </div>
  )
}
