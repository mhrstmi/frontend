import { Route, Routes } from "react-router-dom";
import paths, { pathType } from "./paths";
import { Home } from "../pages";

import React from 'react'

const RenderRouts = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        {paths.map((item: pathType) => (
            <Route
                path={item.path}
                element={item.element}
                loader={undefined}
            />
        ))}
    </Routes>
  )
}

export default RenderRouts


