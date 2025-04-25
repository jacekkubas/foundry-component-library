import { GraphQLClient } from "graphql-request";

const baseUrl = process.env.WORDPRESS_URL || "https://data.foundry.ch";
const graphqlClient = new GraphQLClient(`${baseUrl}/graphql`);

export default graphqlClient;
