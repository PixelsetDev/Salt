import React from "react";
import { View, Text } from "react-native";

export const Difficulty = ({ currentStep, steps = [] }:{currentStep:number, steps:string[]}) => {
  return (
    <View className="grid xl:grid-cols-5 items-center">
      {steps.map((label : string, index : number) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;

        return (
          <View key={index}
            className={`md:h-4 w-full items-center justify-center lg:px-6 md:px-4 sm:px-3 px-2
            ${isActive ? 'bg-green-800' : 'bg-green-200/50'}`}
          >
            <Text className={`xl:hidden block py-0.5 ${isActive && 'font-bold text-white'}`}>{label}</Text>
          </View>
        );
      })}
      {steps.map((label : string, index : number) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;

        return (
          <View className={`xl:block hidden text-center`} key={index}>
            <Text className={`${isActive ? 'text-sm' : 'text-xs'} text-center dark:text-white ${isActive && 'font-bold'}`}>
              {label}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export const Stepper = ({ currentStep, steps = [] }: {currentStep:number, steps:string[]}) => {
  return (
    <View className="flex-row items-center">
      {steps.map((label : string, index : number) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;

        return (
          <React.Fragment key={label}>
            <View className="items-center">
              <View
                className={`rounded-full w-8 h-8 justify-center items-center
                  ${isActive ? "bg-green-900" : isCompleted ? "bg-green-600" : "bg-green-200"}`}
              >
                <Text className={`font-bold text-sm ${(isActive || stepNumber < currentStep) ? "text-white" : "text-green-900"}`}>{stepNumber}</Text>
              </View>
              <Text className="text-xs mt-1 text-center">{label}</Text>
            </View>

            {index < steps.length - 1 && (
              <View
                className={`h-1 flex-1 mx-1 mb-4
                  ${stepNumber < currentStep ? "bg-green-600" : "bg-green-200"}`}
              />
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
};