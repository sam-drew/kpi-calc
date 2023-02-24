"use client";

import Image from "next/image";
import { Inter } from "next/font/google";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const toast = useToast();

  const [targetAverage, setTargetAverage] = useState<number>();
  const [currentAverage, setCurrentAverage] = useState<number>();
  const [totalDays, setTotalDays] = useState<number>();
  const [daysRemaining, setDaysRemaining] = useState<number>();

  const [result, setResult] = useState<number>();

  const onCalculate = () => {
    if (targetAverage && totalDays && currentAverage && daysRemaining) {
      const calcResult =
        (targetAverage * totalDays -
          currentAverage * (totalDays - daysRemaining)) /
        daysRemaining;
      setResult(calcResult);
    } else {
      toast({
        title: "Hey",
        description: "We need all the boxes filled out to do the calcs!",
      });
    }
  };

  const parseValue = (val: string) => {
    if (val === "") {
      return undefined;
    } else {
      return parseFloat(val);
    }
  };

  return (
    <Flex width={"100vw"} minH={"100vh"} p={"16px"} justifyContent={"center"}>
      <Flex maxW="600px" w="100%" direction={"column"}>
        <Heading>KPI Calc</Heading>
        <Box my="8px">
          <Text>Target average</Text>
          <Input
            value={targetAverage?.toString()}
            onChange={(e) => setTargetAverage(parseValue(e.target.value))}
          />
        </Box>
        <Box my="8px">
          <Text>Current average</Text>
          <Input
            value={currentAverage?.toString()}
            onChange={(e) => setCurrentAverage(parseValue(e.target.value))}
          />
        </Box>
        <Box my="8px">
          <Text>Total days in period</Text>
          <Input
            value={totalDays?.toString()}
            onChange={(e) => setTotalDays(parseValue(e.target.value))}
          />
        </Box>
        <Box my="8px">
          <Text>Days remaining in period</Text>
          <Input
            value={daysRemaining?.toString()}
            onChange={(e) => setDaysRemaining(parseValue(e.target.value))}
          />
        </Box>
        <Button mt="16px" variant={"solid"} onClick={() => onCalculate()}>
          Calculate!
        </Button>
        <Box mt="24px">
          {result && (
            <Text fontSize={"24px"} textAlign="center">
              In the days remaining this period youʼd have to average about{" "}
              <Text fontWeight={"700"} as="span">
                {result.toFixed(1)}
              </Text>{" "}
              per day
            </Text>
          )}
        </Box>
      </Flex>
    </Flex>
  );
}
