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
    subagents: gql`
      mutation DeleteSubagent($id: Int!) {
        deleteSubagent(id: $id)
      }
    `,
    countries: gql`
      mutation DeleteCountry($id: Int!) {
        deleteCountry(id: $id)
      }
    `,
    agents: gql`
      mutation DeleteAgent($id: Int!) {
        deleteAgent(id: $id)
      }
    `,
    contragents: gql`
      mutation DeleteContragent($id: Int!) {
        deleteContragent(id: $id)
      }
    `,
    clients: gql`
      mutation DeleteClient($id: Int!) {
        deleteClient(id: $id)
      }
    `,
    subagentPayers: gql`
      mutation DeleteSubagentPayers($id: Int!) {
        deleteSubagentPayer(id: $id)
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
    `,
    subagents: gql`
      mutation CreateSubagent($input: CreateSubagentInput!) {
        createSubagent(input: $input) {
          id
          name
          orders {id}
          subagentPayers {id}
        }
      }
    `,
    countries: gql`
      mutation CreateCountry($input: CreateCountryInput!) {
        createCountry(input: $input) {
          id
          name
          code
          full_name
          orders {id}
        }
      }
    `,
    agents: gql`
      mutation CreateAgent($input: CreateAgentInput!) {
        createAgent(input: $input) {
          id
          name
          orders {
            id
          }
        }
      }
    `,
    contragents: gql`
      mutation CreateContragent($input: CreateContragentInput!) {
        createContragent(input: $input) {
          id
          name
          orders {
            id
          }
        }
      }
    `,
    clients: gql`
      mutation CreateClient($input: CreateClientInput!) {
        createClient(input: $input) {
          id
          name
          inn
          orders {
            id
          }
        }
      }
    `,
    subagentPayers: gql`
      mutation CreateSubagentPayer($input: CreateSubagentPayerInput!) {
        createSubagentPayer(input: $input) {
          name
          orders {id}
          subagents {id}
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
    `,
    subagents: gql`
      mutation UpdateSubagent($input: UpdateSubagentInput!) {
        updateSubagent(input: $input) {
          id
          name
          orders {id}
          subagentPayers {id}
        }
      }
    `,
    agents: gql`
      mutation UpdateAgent($input: UpdateAgentInput!) {
        updateAgent(input: $input) {
          id
          name
          orders {
            id
          }
        }
      }
    `,
    contragents: gql`
      mutation UpdateContragent($input: UpdateContragentInput!) {
        updateContragent(input: $input) {
          id
          name
          orders {
            id
          }
        }
      }
    `,
    clients: gql`
      mutation UpdateClient($input: UpdateClientInput!) {
        updateClient(input: $input) {
          id
          name
          inn
          orders {
            id
          }
        }
      }
    `,
    countries: gql`
      mutation UpdateCountry($input: UpdateCountryInput!) {
        updateCountry(input: $input) {
          id
          name
          code
          full_name
          orders {id}
        }
      }
    `,
    subagentPayers: gql`
      mutation UpdateSubagentPayer($input: UpdateSubagentPayerInput!) {
        updateSubagentPayer(input: $input) {
          id,
          name,
          orders {id},
          subagents {id}
        }
      }
    `
  }
}