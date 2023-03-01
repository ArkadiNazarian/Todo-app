import { useContainer } from "./container"
import { View } from "./view"

export const SignUp = () => {
    const props = useContainer();
    return <View {...props}/>
}