// eslint-disable-next-line
import { roasterUrl as ROASTER_URL, url as API_URL } from "utilities/apiUtils";

const urls = id => ({
    activity: `${ROASTER_URL(id)}/subscriptions`,
    batches: `${ROASTER_URL(id)}/batches`,
    log: `${ROASTER_URL(id)}/lots_by_date`,
    lots: `${ROASTER_URL(id)}/lots`,
    producers: `${API_URL}/producers`,
    inventory: `${ROASTER_URL(id)}/inventory_items`,
    transactions: `${ROASTER_URL(id)}/transactions`,
    products: `${ROASTER_URL(id)}/products`,
    variants: `${ROASTER_URL(id)}/variants`
});

export default urls;
