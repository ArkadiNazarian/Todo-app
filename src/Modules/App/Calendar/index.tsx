import { useContainer } from "./container"
import { View } from "./view"

export const Calendar = () => {
    const props = useContainer();
    return <View {...props}/>
}
