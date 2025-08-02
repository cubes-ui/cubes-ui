import { useCallback, useState } from "react";
import { Button } from "../../components";

const CHAR_SET = "ABCDEFGHJKLMNPQRSTUVWXYZ123456789";

function generateCaptcha(length = 6): string {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += CHAR_SET.charAt(Math.floor(Math.random() * CHAR_SET.length));
  }
  return result;
}

export function useCaptcha(length = 6) {
  const [captcha, setCaptcha] = useState(() => generateCaptcha(length));

  const refresh = useCallback(() => {
    setCaptcha(generateCaptcha(length));
  }, [length]);

  const validate = useCallback(
    (input: string) => {
      const isValid = input.trim().toUpperCase() === captcha;
      refresh();
      return isValid;
    },
    [captcha]
  );

  return {
    CaptchaComponent: ({ title = "get new captcha" }: { title?: string }) => (
      <div className="flex items-center gap-3">
        <div className="font-mono font-bold text-lg bg-gray-100 p-2 rounded">
          {captcha}
        </div>
        <Button variant="outline" onClick={refresh}>
          {title}
        </Button>
      </div>
    ),
    captcha,
    refresh,
    validate,
  };
}
