import {createServerRunner} from "@aws-amplify/adapter-nextjs";
import config from '@/../amplify_outputs.json'
import {cookies} from 'next/headers'
import {getCurrentUser} from "@aws-amplify/auth/server";
import { generateServerClientUsingCookies } from '@aws-amplify/adapter-nextjs/data';
import {Schema} from "../../amplify/data/resource";


export const cookieBasedClient = generateServerClientUsingCookies<Schema>({
  config,
  cookies,
  authMode: 'userPool'
});


export const {runWithAmplifyServerContext} = createServerRunner({
  config
})

export const isAuthenticated = async () => {

  return await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: async (contextSpec) => {
      try {
        const user = await getCurrentUser(contextSpec);
        return !!user;
      } catch (e) {
        return false;
      }
    },
  });
};