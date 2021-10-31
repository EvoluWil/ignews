import React from "react";
import { SubscribeContainer } from "./style";

interface SubscribeButtonProps {
  priceId: string;
}

export const SubscribeButton = ({ priceId }: SubscribeButtonProps) => {
  return <SubscribeContainer type="button">Subscribe now</SubscribeContainer>;
};
