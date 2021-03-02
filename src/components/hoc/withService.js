import React from "react";

import { ServiceConsumer } from "../elements/service-provider";

const witheService = (Wrapped) => {
  return (props) => {
    return (
      <ServiceConsumer>
        {(service) => {
          return <Wrapped {...props} service={service} />;
        }}
      </ServiceConsumer>
    );
  };
};

export default witheService;
