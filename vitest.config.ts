import type { ConfigEnv } from "vite";
import { getViteConfig } from "astro/config";

// `getViteConfig` tipa seu argumento como `UserConfig` do Vite (não conhece a
// chave `test` do Vitest), e o pacote traz uma cópia aninhada do Vite cujo
// `declare module "vite"` não se aplica ao Vite de nível superior usado pelo
// Astro — por isso a chave `test` não pode ir dentro do objeto passado a
// `getViteConfig`. Em vez disso, resolvemos a config do Astro normalmente e
// mesclamos a config do Vitest por fora, num objeto plano sem anotação de
// tipo do Vite, mantendo os tipos honestos dos dois lados.
const astroViteConfig = getViteConfig({});

export default async function config(env: ConfigEnv) {
  const resolved = await astroViteConfig(env);

  return {
    ...resolved,
    test: {
      include: ["src/**/*.test.ts"],
    },
  };
}
