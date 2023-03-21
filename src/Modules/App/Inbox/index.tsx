import { useContainer } from "./container"
import { View } from "./view"

export const Inbox = () => {
    const props = useContainer();
    return <View {...props}/>
}