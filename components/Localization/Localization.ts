import { Preserved } from "essentials/interfaces/Types"
import { Memo } from "../utils/memo"
import langFile from "./lang.json"

function requireLangFile(lang: LangName) {
  if (Localization.path) {
    try {
      const file = lang + ".json"
      return require(Localization.path + "/" + file)
    } catch (error) {
      if (error instanceof Error) {
        throw new Exception("TranslationError", "cannot require lang file")
      }
    }
  }

  throw new Exception("TranslationErro1r", "Empty path")
}

type ExceptionName = "TranslationError"
class Exception extends Error {
  constructor(public name: ExceptionName | Preserved<string>, message?: string) {
    super(message)
  }
}

// JSON isn't accisible by default, hence we need this type
// type Accessible<T extends object> = T & { [x in {}]: T[keyof T] }
// type AccessibleLoop<T extends any> = T extends object ? ({ [K in keyof T]: AccessibleLoop<T[K]> } & Accessible<T>) : T

// const obj = langFile as AccessibleLoop<typeof langFile>

// const bar = "bar" as string
// const number = 6 as number
// const fu = "fu" as string
// const poki = "poki" as string
// const g = 64 as number
// const s = "s" as string

// obj[bar]
// obj[number]
// obj[fu]
// obj.fu[g].toString

/**
  * Loop in object deeply and make it accessible
*/
type AccessibleDeeply<T extends object> = T

type LangName = Preserved<Lowercase<string>>
type LangPatern = Preserved<object>

class Localization {
  public static settings: {
    defaultLang: LangName
  }
  public static path = ""
  private static lang: LangName = Localization.getLangFromStorage()
  private static langs = new Set<LangName>()
  private static cache = new Map<LangName, LangPatern>()

  public static setLang(lang: LangName) {
    this.lang = lang
    localStorage.setItem("lang", lang)
  }
  private static getLangFromStorage(): LangName {
    return localStorage.getItem("lang") || this.settings.defaultLang
  }

  public static include(lang: LangName) {
    this.langs.add(lang)
  }

  public static cacheRequire(lang: LangName) {
    if (!this.cache.has(lang)) {
      this.cache.set(lang, requireLangFile(lang))
    }

    this.setLang(lang)
  }

  public static get(): LangPatern {
    if (this.cache.has(this.lang)) {
      this.cacheRequire(this.lang)
    }

    return this.cache.get(this.lang)!
  }
}

export function LocalizeExpensive<Selected extends AccessibleDeeply<LangPatern> = LangPatern>(selector: (trans: LangPatern) => Selected): Partial<Selected> {
  const translation = Localization.get()

  try {
    if (selector) {
      return selector(translation) || {}
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Error in localization selector: ")

      if (error instanceof Error) {
        console.warn(error.message, error.stack)
      }
    }

    return {}
  }

  return translation
}

export const Localize = Memo(LocalizeExpensive)
export const useLocalization = Localize
