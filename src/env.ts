import { z } from 'zod'

/* Constante envSchema define o schema que edevem estar as variáveis ambiente, um objeto e conter a propriedade NEXT_PUBLIC_API_BASE_URL, com valor validado pelo zod, string com formato de url */
const envSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.string().url(),
  APP_URL: z.string().url(),
})

/* Constante parsedEnv recebe o resultado da validação do process.env (variáveis ambiente) com o schema criado */
const parsedEnv = envSchema.safeParse(process.env)

/* Se houver falha na validação, imprime erro no console e lança um evento de erro  */
if (!parsedEnv.success) {
  console.error(
    'Invalid enviroment variables',
    parsedEnv.error.flatten().fieldErrors,
  )

  throw new Error('Invalid enviroment variables.')
}

/* Se validado com sucesso, exporta a variável ambiente. */
export const env = parsedEnv.data
