import { useContainer } from "./container"
import { View } from "./view"

export const Login = () => {
    const props = useContainer();
    return <View {...props}/>
}