import { gql } from "@apollo/client";

export const mutation = {
  delete: {
    orders: gql`
      mutation DeleteOrder($id: Int!) {
        deleteOrder(id: $id)
      }
    `,
    managers: gql`
      mutation DeleteManager($id: Int!) {
        deleteManager(id: $id)
      }
    `,
  },
}