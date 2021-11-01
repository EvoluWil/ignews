import React from "react";
import { signIn, useSession } from "next-auth/client";
import { api } from "../../../services/api";
import { getStripeJs } from "../../../services/stripe-js";
import { SubscribeContainer } from "./style";
import { toast } from "react-toastify";

interface SubscribeButtonProps {
  priceId: string;
}

export const SubscribeButton = ({ priceId }: SubscribeButtonProps) => {
  const [session] = useSession();

  const handleSubscribe = async () => {
    if (!session) {
      signIn("github");
      return;
    }

    try {
      const { data } = await api.post("/subscribe");
      const { sessionId } = data;

      const stripe = await getStripeJs();

      await stripe?.redirectToCheckout({ sessionId });
    } catch (err: any) {
      toast.error(
        "Ops! algo deu errado, verifique sua conexão e tente novamente."
      );
    }
  };

  return (
    <SubscribeContainer type="button" onClick={handleSubscribe}>
      Subscribe now
    </SubscribeContainer>
  );
};
