import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.LinkedList;
import java.util.PriorityQueue;
import java.util.Queue;

class State {
    int board[][];
    int count;

    public State(int[][] arr, int count) {
        this.board = arr;
        this.count = count;
    }
}

class BorderNum{
    int x, y;
    int num;
    int moveCnt;

    public BorderNum(int x, int y, int num, int moveCnt) {
        this.x = x;
        this.y = y;
        this.num = num;
        this.moveCnt = moveCnt;
    }
}

public class Solution {
    static int n, arr[][];
    static int dx[] = {-1, 0, 1, 0}, dy[] = {0, 1, 0, -1};
    public static void main(String[] args) throws IOException {
        init();
        solution();
    }

    static void solution() {
        int answer = 0;
        State s = new State(arr, 0);
        Queue<State> q = new LinkedList<>();
        q.add(s);
        while (!q.isEmpty()) {
            State here = q.poll();
            if(here.count == 10) {
                answer = Math.max(answer, getMax(here.board));
                continue;
            }
            for (int d = 0; d < 4; d++) {
                int b[][] = move(here.board, d);
                q.add(new State(b, here.count + 1));
            }
        }
        System.out.println(answer);
    }

    static int[][] move(int[][] b, int d) {
        int board[][] = new int[n][n];
        PriorityQueue<BorderNum> borderNumber[] = new PriorityQueue[n];

        for (int i = 0; i < n; i++) {
            borderNumber[i] = new PriorityQueue<>((temp, temp2) -> (temp.moveCnt - temp2.moveCnt));
        }

        for (int row = 0; row < n; row++) {
            for (int col = 0; col < n; col++) {
                int num = b[row][col], x = row, y = col;
                if(num != 0) {
                    int cnt = 0;
                    while(isBorder(x + dx[d], y + dy[d])) {
                        cnt += 1;
                        x += dx[d];
                        y += dy[d];
                    }
                    if(d == 0 || d == 2)
                        borderNumber[col].add(new BorderNum(row, col, num, cnt));
                    else
                        borderNumber[row].add(new BorderNum(row, col, num, cnt));
                }
            }
        }
        boolean placed[][] = new boolean[n][n];
        boolean merged[][] = new boolean[n][n];

        for (int i = 0; i < n; i++) {
            PriorityQueue<BorderNum> pq = borderNumber[i];
            while (!pq.isEmpty()) {
                BorderNum here = pq.poll();
                int x = here.x, y = here.y, num = here.num;
                boolean flag = true;
                while(isBorder(x + dx[d], y + dy[d])) {
                    if(board[x + dx[d]][y + dy[d]] == 0){
                        x += dx[d];
                        y += dy[d];
                        continue;
                    }

                    if(board[x + dx[d]][y + dy[d]] == num && !merged[x + dx[d]][y + dy[d]]){
                        board[x + dx[d]][y + dy[d]] *= 2;
                        merged[x + dx[d]][y + dy[d]] = true;
                        flag = false;
                        break;
                    }
                    else {
                        board[x][y] = num;
                        placed[x][y] = true;
                        flag = false;
                        break;
                    }
                }
                if(flag){
                    board[x][y] = num;
                    placed[x][y] = true;
                }
            }
        }
        return board;
    }
    static boolean isBorder(int x, int y) {
        return (x >= 0 && x < n && y >= 0 && y < n);
    }
    static int getMax(int[][] board) {
        int ret = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                ret = Math.max(ret, board[i][j]);
            }
        }
        return ret;
    }
    static void init() throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        n = stoi(br.readLine());
        arr = new int[n][n];
        for (int i = 0; i < n; i++) {
            String[] s = br.readLine().split(" ");
            for (int j = 0; j < n; j++) {
                arr[i][j] = stoi(s[j]);
            }
        }
    }
    static int stoi(String str) {
        return Integer.parseInt(str);
    }
}