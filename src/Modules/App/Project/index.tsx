import { useContainer } from "./container"
import { View } from "./view"

export const Project = () => {
    const props = useContainer();
    return <View {...props}/>
}