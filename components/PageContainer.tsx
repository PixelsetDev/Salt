import {View} from "react-native";
import {ReactNode} from "react";

export const PageContainer = ({ children }: { children: ReactNode }) => (
    <View className="font-sans-serif">
        {children}
    </View>
);

export default PageContainer;