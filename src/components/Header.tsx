import Stack from '@mui/material/Stack';
import Search from './Search';
import ColorThemeSelector from './ColorThemeSelector';

interface HeaderProps {
  setSearchQuery: (query: string) => void;
}

export default function Header({ setSearchQuery }: HeaderProps) {
  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: 'none', md: 'flex' },
        width: 'auto',
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        maxWidth: { sm: '100%', md: '100%' },
        pt: 1.5,
        padding: '20px 0px',
      }}
      spacing={2}
    >
      <Search setSearchQuery={setSearchQuery} />
      <ColorThemeSelector />
    </Stack>
  );
}
