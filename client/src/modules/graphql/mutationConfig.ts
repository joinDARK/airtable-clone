export default {
    delete: {
        managers: (id?: number) => `deleteManager(id: ${id})`,
        orders: (id?: number) => `deleteOrders(id: ${id})`
    }
}