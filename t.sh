mkdir -p ~/.config/nvim/lua/plugins

cat >~/.config/nvim/lua/plugins/conform.lua <<'EOF'
return {
  {
    "stevearc/conform.nvim",
    opts = function(_, opts)
      opts.formatters_by_ft = opts.formatters_by_ft or {}

      opts.formatters_by_ft.javascript = { "prettier" }
      opts.formatters_by_ft.javascriptreact = { "prettier" }
      opts.formatters_by_ft.typescript = { "prettier" }
      opts.formatters_by_ft.typescriptreact = { "prettier" }
      opts.formatters_by_ft.json = { "prettier" }
      opts.formatters_by_ft.css = { "prettier" }
      opts.formatters_by_ft.html = { "prettier" }
      opts.formatters_by_ft.markdown = { "prettier" }
    end,
  },
}
EOF

echo "✅ LazyVim Prettier formatter config installed"
echo "Restart Neovim and run: :ConformInfo"
