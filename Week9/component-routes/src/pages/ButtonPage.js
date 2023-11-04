import Button from "../components/Button";
import { MdCurrencyExchange } from "react-icons/md";

export default function ButtonPage() {
    const handleClick = () => {
        console.log('click')
    }

    return (
        <div>
            <Button primary
                rounded
                outline
                onClick={handleClick}
                className="mb-5"
            >
                <MdCurrencyExchange />
                Buy now
            </Button>
            <Button success rounded>Sign OUt</Button>
            <Button danger outline>Delete</Button>
        </div>
    );
}