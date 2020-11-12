import React from "react"
import Header from "../../components/Header"
import ColumnFlexLayout from "../../components/ColumnFlexLayout"

export default function PickCategories() {
  return (
    <ColumnFlexLayout
      children={[<Header content="Categories" style={{ fontSize: 30 }} />]}
    />
  )
}
