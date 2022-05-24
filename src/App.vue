<template>
  <router-view />
</template>

<script setup lang="ts">
import { provide } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { relayStylePagination } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

import { ApolloClient, InMemoryCache } from "@apollo/client/core";

// HTTP connection to the API
const httpLink = new GraphQLWsLink(
  createClient({
    url: "ws://nu.localhost/api/graphql",
  })
);

// Cache implementation
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        channel: {
          read(_, { args, toReference }) {
            return toReference({
              __typename: "Channel",
              id: args?.id,
            });
          },
        },
      },
    },
    Channel: {
      fields: {
        messages: relayStylePagination(),
      },
    },
    ChannelMessage: {
      fields: {
        timestamp: {
          read(t) {
            return new Date(t);
          },
        },
      },
    },
  },
});

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});
provide(DefaultApolloClient, apolloClient);
</script>

<style lang="scss">
@import "scss/variables";
@import "~bootstrap/scss/bootstrap";
@import "~bootstrap-icons/font/bootstrap-icons.css";

:root {
  --nu-base: #{$nu-base};
  --nu-light-1: #{$nu-light-1};
  --nu-light-2: #{$nu-light-2};
  --nu-light-3: #{$nu-light-3};
  --nu-light-4: #{$nu-light-4};
  --nu-light-5: #{$nu-light-5};
  --nu-dark-1: #{$nu-dark-1};
  --nu-dark-2: #{$nu-dark-2};
  --nu-dark-3: #{$nu-dark-3};
  --nu-dark-4: #{$nu-dark-4};
  --nu-dark-5: #{$nu-dark-5};
}

// General style overrides and custom classes
body {
  background-color: black;
  color: white;
  font-family: "Monserratt", monospace;
}
label {
  margin-left: 5px;
  font-size: 0.9rem;
  color: #00a0a0;
}

.form-control {
  font-size: 0.8rem;
  background-color: var(--nu-dark-3);
  border: var(--nu-dark-1) solid 0;
  border-top-width: 1px;
  border-bottom-width: 1px;
  color: white;

  outline: 0;
  overflow: hidden !important;
  transition: none;
  &::placeholder {
    color: var(--nu-base);
  }
  &:focus {
    color: white;
    outline: var(--nu-dark-1);
    background-color: var(--nu-dark-2);
    border-color: var(--nu-base);
    box-shadow: inset 0 11px 4px -10px var(--nu-base),
      inset 0 -11px 4px -10px var(--nu-base);
  }

  &:disabled {
    background-color: var(--nu-dark-5);
    border-color: var(--nu-dark-3);
    color: grey;
    &::placeholder {
      color: var(--nu-dark-2);
    }
  }
}

.btn {
  font-size: 0.8rem;
  text-transform: uppercase;
  border-width: 0;
  border-style: solid;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-radius: 0.25rem;
  color: var(--nu-light-2);

  outline: 0;
  --box-shadow-color: var(--nu-dark-1);
  &:hover {
    box-shadow: inset 0 11px 4px -10px var(--box-shadow-color),
      inset 0px -11px 4px -10px var(--box-shadow-color);
  }

  &:active {
    color: white;
    box-shadow: inset 0 11px 4px -10px var(--box-shadow-color),
      inset 0px -11px 4px -10px var(--box-shadow-color);
  }

  &:focus {
    box-shadow: inset 0 11px 4px -10px var(--box-shadow-color),
      inset 0px -11px 4px -10px var(--box-shadow-color);
  }

  &:active:focus {
    box-shadow: inset 0 11px 4px -10px var(--box-shadow-color),
      inset 0px -11px 4px -10px var(--box-shadow-color);
  }

  transition: none;
}

.btn-secondary {
  border-color: var(--nu-dark-1);
  background-color: var(--nu-dark-3);

  &:hover,
  &:focus {
    outline: var(--nu-dark-1);
    background-color: var(--nu-dark-2);
    border-color: var(--nu-base);
  }

  &:active {
    background-color: var(--nu-dark-1);
    border-color: var(--nu-light-1);
  }

  &:active:focus {
    box-shadow: inset 0 11px 4px -10px var(--box-shadow-color),
      inset 0px -11px 4px -10px var(--box-shadow-color);
  }
}

.btn-link {
  &:hover,
  &:focus,
  &:active {
    box-shadow: none;
  }

  &:hover,
  &:focus {
    color: white;
    text-decoration: underline;
  }

  &:focus,
  &:active:focus {
    box-shadow: inset 0 0 4px 0 var(--box-shadow-color);
  }
}

.dropdown-menu {
  font-family: "Zen Dots", monospace;
  padding: 0;
  font-size: 0.6rem;
  background-color: var(--nu-dark-3);
  color: white;
  border-radius: 0;
  border: var(--nu-dark-1) 1px solid;
  border-top-width: 0;
}

.dropdown-item {
  color: white;
  border-color: var(--nu-dark-1);
  border-style: solid;
  line-height: 30px;
  padding: 0 0.25rem;

  &:hover,
  &:focus {
    background-color: var(--nu-dark-1);
  }

  &:active {
    background-color: var(--nu-light-3);
    color: var(--nu-dark-2);
  }

  &.active {
    background-color: var(--nu-dark-2);
  }
}

.table {
  --bs-table-hover-bg: var(--nu-dark-2);
  --bs-table-hover-color: white;
  --bs-table-color: white;

  & > :not(:last-child) > :last-child > * {
    border-bottom-color: inherit;
  }
}
</style>
