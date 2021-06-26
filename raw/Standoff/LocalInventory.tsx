/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { WeaponDropProps } from "../../../resources/interfaces/weapon"
import { WeaponProps } from "./Weapon"
import Weapon from "./Weapon"
import { useEffect, useState } from "react"
import WebStore from "resources/stores/store"
import { useSelector } from "react-redux"
import Empty from "../other/Empty"
import { QueryPaggination, useContextQuery } from "../other/MutuableQuery"
import { getUserInventory } from "app/api/actions"

interface InventoryContainerProps {
  exept?: number[]
  maxHeight?: string
  action?: WeaponProps["action"]
  filter?: (weapon: WeaponDropProps) => boolean
}

/**
 * Must be in the context
 * @param param0 
 * @returns 
 */
export function InventoryContainer({ exept, filter, maxHeight, action }: InventoryContainerProps) {
  const { payload, query } = useContextQuery<ReturnType<typeof getUserInventory>>()
  useEffect(() => {
    return WebStore.subscribe(action => {
      if (action.type === "LOCAL_INVENTORY_UPDATE") {
        query()
      }
    })
  }, [query])

  const drops = payload.items.data

  if (drops.length <= 0) {
    return <Empty />
  }

  return (
    <QueryPaggination use="items">
      <div className="weapons-container" style={{ height: maxHeight, overflow: "auto" }}>
        {drops.map(drop => (filter?.(drop) ?? true) && !exept?.includes(drop.id) && (
          <Weapon {...drop} action={action} key={"drop_key_" + drop.id} />
        ))}
      </div>
    </QueryPaggination>
  )
}
