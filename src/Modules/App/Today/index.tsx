import { useContainer } from "./container"
import { View } from "./view"

export const Today = () => {
    const props = useContainer();
    return <View {...props}/>
}