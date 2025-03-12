import { env } from '@/env'

export function api(path: string, init?: RequestInit) {
  /* constante baseUrl carrega a variavel ambiente */
  const baseUrl = env.NEXT_PUBLIC_API_BASE_URL

  /* constante recebe o prefixo da url para a API */
  const apiPrefix = '/api'

  /* construtor global URL que concatena url recebida à url base com o prefixo para a api */
  const url = new URL(apiPrefix.concat(path), baseUrl)

  return fetch(url, init)
}
