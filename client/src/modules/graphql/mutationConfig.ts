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
  create: {
    managers: gql`
      mutation CreateManager($input: CreateManagerInput!) {
        createManager(input: $input) {
          id
          name
          tel
          date
          orders {id}
          review_table {id}
        }
      }
    `
  },
  update: {
    managers: gql`
      mutation UpdateManager($input: UpdateManagerInput!) {
        updateManager(input: $input) {
          id
          name
          tel
          date
          orders {id}
          review_table {id}
        }
      }
    `
  }
}