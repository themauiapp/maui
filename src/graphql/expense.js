import { gql } from "@apollo/client";

export const TOPEXPENSES = gql`
    query TopExpenses($id: ID) {
        topExpenses(id: $id)
    }
`;