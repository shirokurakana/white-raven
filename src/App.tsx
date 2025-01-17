import { jwtTokenKey } from 'api';
import { DialogHost } from 'components/dialog';
import LoggedInContextRoot from 'models/logged-in-context';
import { ThemeType, useTheme } from 'models/store';
import { useEffect, useState } from 'react';
import LoginView from 'views/login-view';
import WindowView from './views/window-view';

const hasBeenLoggedIn = !!localStorage.getItem(jwtTokenKey);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(hasBeenLoggedIn);
  const [theme] = useTheme();
  useEffect(() => {
    const classList = document.body.classList;
    const prevTheme: ThemeType = theme === 'theme-light' ? 'theme-dark' : 'theme-light';
    classList.remove(prevTheme);
    classList.add(theme);
  }, [theme]);

  return isLoggedIn ? (
    <LoggedInContextRoot>
      {/* FIXME: 需要想办法让 Dialog 的实例就地创建，否则组件中使用的 hook 将获取不到 DialogHost 内部的 Context；
      这是因为当前创建组件在 DialogHost 内，只能获得 DialogHost 上级的 Context。 */}
      <DialogHost>
        <WindowView />
      </DialogHost>
    </LoggedInContextRoot>
  ) : (
    <LoginView setIsLoggedIn={setIsLoggedIn} />
  );
}

export default App;
