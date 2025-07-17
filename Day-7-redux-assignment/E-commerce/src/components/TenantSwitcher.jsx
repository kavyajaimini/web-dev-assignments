import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { switchTenant } from "../redux/slices/userSlice";

const tenants = ["default", "storeA", "storeB", "storeC"];

export default function TenantSwitcher() {
  const tenant = useSelector((s) => s.user.tenant);
  const dispatch = useDispatch();
  return (
    <div style={{ margin: "16px 0" }}>
      <b>Tenant:</b>
      <select
        value={tenant}
        onChange={(e) => dispatch(switchTenant(e.target.value))}
        style={{ marginLeft: 8 }}
      >
        {tenants.map((t) => (
          <option key={t}>{t}</option>
        ))}
      </select>
    </div>
  );
}
