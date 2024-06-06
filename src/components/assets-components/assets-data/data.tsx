import {
    ArrowDownIcon,
    ArrowRightIcon,
    ArrowUpIcon,
    CheckCircledIcon,
    CircleIcon,
    CrossCircledIcon,
    QuestionMarkCircledIcon,
    StopwatchIcon,
  } from "@radix-ui/react-icons"
  
  export const labels = [
    {
      value: "bug",
      label: "Bug",
    },
    {
      value: "feature",
      label: "Feature",
    },
    {
      value: "documentation",
      label: "Documentation",
    },
  ]
  
  export const statuses = [
    {
      value: "Onboarding",
      label: "Onboarding",
      icon: QuestionMarkCircledIcon,
    },
    {
      value: "Confirmed",
      label: "Confirmed",
      icon: CircleIcon,
    },
    {
      value: "Probation",
      label: "Probation",
      icon: StopwatchIcon,
    },
    {
      value: "Contract",
      label: "Contract",
      icon: CheckCircledIcon,
    },
    {
      value: "Trainee",
      label: "Trainee",
      icon: CrossCircledIcon,
    },
  ]
  
  export const priorities = [
    {
      label: "Low",
      value: "low",
      icon: ArrowDownIcon,
    },
    {
      label: "Medium",
      value: "medium",
      icon: ArrowRightIcon,
    },
    {
      label: "High",
      value: "high",
      icon: ArrowUpIcon,
    },
  ]