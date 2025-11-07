{
  pkgs,
  lib,
  config,
  inputs,
  ...
}: {
  overlays = let
    playwright = inputs.playwright;
    system = "x86_64-linux";
  in [
    (final: prev: {
      inherit (playwright.packages.${system}) playwright-test playwright-driver;
    })
  ];

  packages = with pkgs; [
    git
    nodejs_latest
    nodePackages.npm
    playwright-test
    playwright-driver.browsers
  ];

  env = {
    PLAYWRIGHT_BROWSERS_PATH = "${pkgs.playwright-driver.browsers}";
    PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS = "true";
  };

  languages = {
    go.enable = true;
    javascript = {
      enable = true;
      npm.enable = true;
    };
    typescript.enable = true;
  };

  # https://devenv.sh/scripts/
  scripts.hello.exec = ''
    echo hello from $GREET
  '';
}
